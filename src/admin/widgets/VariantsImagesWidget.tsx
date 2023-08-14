import { useState } from 'react';
import { Button, Container, DropdownMenu, Heading } from '@medusajs/ui';
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

  const handleClose = () => {
    setOpenedVariant(null);
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
                  <Button variant="secondary" format={'icon'}>
                    <EllipsisHorizontal />
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item
                    onClick={() => {
                      setOpenedVariant(variant);
                    }}
                    className="gap-x-2"
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit Media
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </div>
            <div className="flex flex-wrap">
              {variant.images.length ? (
                variant.images.map((image) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt="Uploaded image"
                    className="mr-1 h-20 w-20 object-cover"
                  />
                ))
              ) : (
                <span className="inter-small-regular">No images...</span>
              )}
            </div>
          </div>
        ))}
      </Container>

      <VariantsImagesModal
        product={product}
        variant={openedVariant}
        open={!!openedVariant}
        onClose={handleClose}
        notify={notify}
      />
    </>
  );
};

export const config: WidgetConfig = {
  zone: 'product.details.after',
};

export default VariantsImagesWidget;
