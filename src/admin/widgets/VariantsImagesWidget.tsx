import { useState } from 'react';
import { IconButton, Container, DropdownMenu, Heading } from '@medusajs/ui';
import { ProductDetailsWidgetProps, WidgetConfig } from '@medusajs/admin';
import { ProductVariant } from '@medusajs/medusa';
import { EllipsisHorizontal, PencilSquare } from '@medusajs/icons';
import VariantsImagesModal from '../VariantsImages/VariantsImagesModal';

const VariantsImagesWidget = ({
  product,
  notify,
}: ProductDetailsWidgetProps) => {
  const [openedVariant, setOpenedVariant] = useState<ProductVariant | null>(
    null
  );
  const [openedDialogType, setOpenedDialogType] = useState<
    'media' | 'thumbnail' | null
  >(null);

  const handleClose = () => {
    setOpenedVariant(null);
    setOpenedDialogType(null);
  };

  return (
    <>
      <Container title="Variants Images">
        <Heading
          level="h1"
          className="flex items-center justify-between gap-x-4 text-2xl font-semibold"
        >
          <div>Variants Images</div>
        </Heading>
        {product.variants.map((variant) => (
          <div key={variant.id} className="mt-3 w-full">
            <div className="flex items-center">
              <div className="inter-base-semibold flex-1">{variant.title}</div>
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <IconButton variant="transparent">
                    <EllipsisHorizontal />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    onClick={() => {
                      setOpenedVariant(variant);
                      setOpenedDialogType('thumbnail');
                    }}
                    className="gap-x-2"
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit Thumbnail
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      setOpenedVariant(variant);
                      setOpenedDialogType('media');
                    }}
                    className="gap-x-2"
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit Media
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </div>
            <div className="flex flex-wrap items-center">
              {variant.thumbnail ? (
                <img
                  src={variant.thumbnail}
                  alt="Thumbnail"
                  className="mr-1 mt-1 h-20 w-20 object-cover"
                />
              ) : (
                <div className="inter-regular mr-1 w-20 break-words">
                  No thumbnail
                </div>
              )}

              {variant.images.length ? (
                variant.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt="Uploaded image"
                    className="mr-1 mt-1 h-20 w-20 object-cover"
                  />
                ))
              ) : (
                <span className="inter-regular">No images...</span>
              )}
            </div>
          </div>
        ))}
      </Container>

      {openedDialogType && (
        <VariantsImagesModal
          product={product}
          variant={openedVariant}
          open={!!openedVariant}
          onClose={handleClose}
          type={openedDialogType}
          notify={notify}
        />
      )}
    </>
  );
};

export const config: WidgetConfig = {
  zone: 'product.details.after',
};

export default VariantsImagesWidget;
