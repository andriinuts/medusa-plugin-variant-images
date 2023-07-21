import { ProductVariant } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAdminUpdateVariant, useMedusa } from 'medusa-react';
import { Button, FocusModal } from '@medusajs/ui';
import { nestedForm } from './utils/nestedForm';
import { prepareImages } from './utils/images';
import VariantsImagesMediaForm, {
  MediaFormType,
} from './VariantsImagesMediaForm';

type Notify = {
  success: (title: string, message: string) => void;
  error: (title: string, message: string) => void;
  warn: (title: string, message: string) => void;
  info: (title: string, message: string) => void;
};

export type FormImage = {
  url: string;
  name?: string;
  size?: number;
  nativeFile?: File;
};

type Props = {
  productId: string;
  variant: ProductVariant;
  open: boolean;
  onClose: () => void;
  notify: Notify;
};

type MediaFormWrapper = {
  media: MediaFormType;
};

const VariantsImagesModal = ({
  variant,
  open,
  onClose,
  productId,
  notify,
}: Props) => {
  const { client } = useMedusa();
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate } = useAdminUpdateVariant(productId);
  const form = useForm<MediaFormWrapper>({
    defaultValues: getDefaultValues(variant),
  });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form;

  useEffect(() => {
    reset(getDefaultValues(variant));
  }, [reset, variant]);

  const onReset = () => {
    reset(getDefaultValues(variant));
    onClose();
  };

  const onSubmit = handleSubmit(async (data: any) => {
    setIsUpdating(true);
    let preppedImages: FormImage[] = [];

    try {
      preppedImages = await prepareImages(
        data.media.images,
        client.admin.uploads
      );
    } catch (error) {
      let errorMessage = 'Something went wrong while trying to upload images.';
      const response = (error as any).response as Response;

      if (response.status === 500) {
        errorMessage = `${errorMessage} You might not have a file service configured. Please contact your administrator.`;
      }

      notify.error('Error', errorMessage);
      return;
    }
    const urls = preppedImages.map((image) => image.url);

    // @ts-ignore
    await mutate({ variant_id: variant.id, images: urls });
    onClose();
    setIsUpdating(false);
  });

  return (
    <FocusModal.Root open={open} onOpenChange={onReset} modal>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button
            variant="primary"
            type="submit"
            disabled={!isDirty}
            loading={isUpdating}
            form="variant-images-form"
          >
            Save and close
          </Button>
        </FocusModal.Header>
        <FocusModal.Body className=" p-4">
          <form onSubmit={onSubmit} id="variant-images-form">
            <div>
              <h2 className="inter-large-semibold mb-2xsmall">Media</h2>
              <p className="inter-base-regular text-grey-50 mb-large">
                Add images to your variant.
              </p>
              <div>
                <VariantsImagesMediaForm form={nestedForm(form, 'media')} />
              </div>
            </div>
          </form>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal.Root>
  );
};

const getDefaultValues = (variant: ProductVariant): MediaFormWrapper => {
  return {
    media: {
      images:
        variant?.images?.map((image) => ({
          url: image.url,
          selected: false,
        })) || [],
    },
  };
};

export default VariantsImagesModal;
