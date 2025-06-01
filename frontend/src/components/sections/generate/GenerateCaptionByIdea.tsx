import { useState } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { createCaptionByIdea } from '../../../api/services/idea';
import { IGenerateCaption } from '../../../types/caption';
import Button from '../../common/button/Button';
import RenderCaption from '../render-caption';

const GenerateCaptionByIdea = ({
  isOpen,
  selectedIdea,
  setGenerate,
  generate,
}: {
  isOpen: boolean;
  selectedIdea: string;
  setGenerate: (generate: boolean) => void;
  generate: boolean;
}) => {
  const [dataCaption, setDataCaption] = useState<IGenerateCaption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateCaptionByIdea = async () => {
    setIsLoading(true);
    const response = await createCaptionByIdea({
      idea: selectedIdea,
    });
    setDataCaption(response.data);
    toast.success('Caption generated successfully');
    setIsLoading(false);
  };

  return (
    <div className={twMerge(isOpen ? 'block' : 'hidden')}>
      <div className="mb-5 mt-10 ">
        <div className="flex items-start gap-2">
          <FaArrowDownLong className="text-secondary text-xl" />
          <h1 className="text-lg  font-bold text-secondary">Your Idea:</h1>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-blue-500 border border-blue-500 w-full rounded-md p-4 shadow-md">
            {selectedIdea}
          </p>
          <Button
            loading={isLoading}
            onClick={() => {
              handleGenerateCaptionByIdea();
            }}
            className="w-auto py-4"
          >
            Generate
          </Button>
        </div>
      </div>

      <div className={twMerge('mt-10 ', generate ? 'block' : 'hidden')}>
        <RenderCaption data={dataCaption} selectedIdea={selectedIdea} />
      </div>
    </div>
  );
};

export default GenerateCaptionByIdea;
