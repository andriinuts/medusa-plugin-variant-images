import clsx from 'clsx';
import { useMemo } from 'react';
import {
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { Button, DropdownMenu } from '@medusajs/ui';
import { NestedForm } from './utils/nestedForm';
import { FormImage } from './utils/images';
import FileUploadField from './components/FileUploadField';
import { EllipsisHorizontal, Trash, CheckCircleSolid } from '@medusajs/icons';

type ImageType = { selected: boolean } & FormImage;

export type MediaFormType = {
  images: ImageType[];
};

type Props = {
  form: NestedForm<MediaFormType>;
};

const VariantsImagesMediaForm = ({ form }: Props) => {
  const { control, path, setValue } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: path('images'),
  });

  const handleFilesChosen = (files: File[]) => {
    if (files.length) {
      const toAppend = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        nativeFile: file,
        selected: false,
      }));

      append(toAppend);
    }
  };

  return (
    <div>
      <div>
        <div>
          <FileUploadField
            onFileChosen={handleFilesChosen}
            placeholder="1200 x 1600 (3:4) recommended, up to 10MB each"
            multiple
            filetypes={['image/gif', 'image/jpeg', 'image/png', 'image/webp']}
            className="py-large"
          />
        </div>
      </div>
      {fields.length > 0 && (
        <div className="mt-large">
          <div className="mb-small flex items-center justify-between">
            <h2 className="inter-large-semibold">Uploads</h2>
          </div>
          <div className="flex flex-wrap">
            {fields.map((field, index) => {
              return (
                <Image
                  key={field.id}
                  image={field}
                  index={index}
                  remove={remove}
                  form={form}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

type ImageProps = {
  image: FieldArrayWithId<MediaFormType, 'images', 'id'>;
  index: number;
  remove: (index: number) => void;
  form: NestedForm<MediaFormType>;
};

const Image = ({ image, index, form, remove }: ImageProps) => {
  const { control, path } = form;

  return (
    <Controller
      name={path(`images.${index}.selected`)}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div className="relative">
            <button
              className={clsx(
                'px-base py-xsmall hover:bg-grey-5 rounded-rounded group flex items-center justify-between',
                {
                  'bg-grey-5': value,
                }
              )}
              type="button"
              onClick={() => onChange(!value)}
            >
              <div className="gap-x-large flex items-center">
                <div className="flex h-16 w-16 items-center justify-center">
                  <img
                    src={image.url}
                    alt={image.name || 'Uploaded image'}
                    className="rounded-rounded max-h-[64px] max-w-[64px]"
                  />
                </div>
              </div>
              <div className="gap-x-base flex items-center">
                <span
                  className={clsx('hidden', {
                    '!text-violet-60 !block': value,
                  })}
                >
                  <CheckCircleSolid />
                </span>
              </div>
            </button>
          </div>
        );
      }}
    />
  );
};

export default VariantsImagesMediaForm;
