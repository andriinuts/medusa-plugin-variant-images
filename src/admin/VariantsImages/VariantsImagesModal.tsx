import { Product, ProductVariant } from '@medusajs/medusa';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAdminUpdateProduct,
  useAdminUpdateVariant,
  useMedusa,
} from 'medusa-react';
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
  product: Product;
  variant: ProductVariant;
  open: boolean;
  onClose: () => void;
  notify: Notify;
  type: 'thumbnail' | 'media';
};

type MediaFormWrapper = {
  media: MediaFormType;
};

const VariantsImagesModal = ({
  variant,
  open,
  onClose,
  product,
  notify,
  type,
}: Props) => {
  const { client } = useMedusa();
  const [isUpdating, setIsUpdating] = useState(false);
  const adminUpdateVariant = useAdminUpdateVariant(product?.id);
  const adminUpdateProduct = useAdminUpdateProduct(product?.id);
  const form = useForm<MediaFormWrapper>({
    defaultValues: getDefaultValues(product, variant, type),
  });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form;

  useEffect(() => {
    reset(getDefaultValues(product, variant, type));
  }, [reset, product, variant, type]);

  const onReset = () => {
    reset(getDefaultValues(product, variant, type));
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
    await adminUpdateProduct.mutate({ images: urls });

    if (type === 'thumbnail') {
      const thumbnail =
        data.media.images.find((image) => image.selected)?.url || null;

      await adminUpdateVariant.mutate({
        variant_id: variant.id,
        // @ts-ignore
        thumbnail,
      });
    } else {
      const images = data.media.images
        .map(({ selected }, i: number) => selected && urls[i])
        .filter(Boolean);

      await adminUpdateVariant.mutate({
        variant_id: variant.id,
        // @ts-ignore
        images,
      });
    }

    onClose();
    setIsUpdating(false);
  });

  return (
    <FocusModal open={open} onOpenChange={onReset} modal>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button
            variant="primary"
            type="submit"
            disabled={!isDirty}
            isLoading={isUpdating}
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
                Add images to your product media.
              </p>
              <div>
                <VariantsImagesMediaForm
                  form={nestedForm(form, 'media')}
                  type={type}
                />
              </div>
            </div>
          </form>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

const getDefaultValues = (
  product: Product,
  variant: ProductVariant,
  type: 'thumbnail' | 'media'
): MediaFormWrapper => {
  return {
    media: {
      images:
        product?.images?.map((image) => ({
          url: image.url,
          selected:
            type === 'thumbnail'
              ? variant.thumbnail === image.url
              : variant?.images?.some((vImage) => vImage.url === image.url) ??
                false,
        })) || [],
    },
  };
};

export default VariantsImagesModal;
