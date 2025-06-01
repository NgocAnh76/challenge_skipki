import { twMerge } from 'tailwind-merge';
import CaptionItem from '../../common/caption-item';
import { IGenerateCaption } from '../../../types/caption';

const RenderCaption = ({
  data,
  selectedIdea,
}: {
  data: IGenerateCaption[];
  selectedIdea: string;
}) => {
  return (
    <>
      <div className="text-secondary">
        <h1 className="text-xl font-bold  mb-2">Captions generated for you</h1>
        <p className="text-sm   max-w-md">
          This is the caption for your post. You can choose any topic that suits you.
        </p>
      </div>

      <ul className={twMerge('mt-5')}>
        {data.map((item, index) => (
          <CaptionItem
            key={index}
            data={{
              content: item.caption,
              topic: selectedIdea || '',
            }}
          />
        ))}
      </ul>
    </>
  );
};

export default RenderCaption;
