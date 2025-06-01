import { useState } from 'react';
import { toast } from 'react-toastify';
import { twMerge } from 'tailwind-merge';
import { createCaption } from '../../../api/services/caption';
import { IGenerateCaption } from '../../../types/caption';
import Button from '../../common/button/Button';
import CaptionItem from '../../common/caption-item';
import { PHONE_NUMBER } from '../../../api/constant';

interface GenerateProps {
  isOpen: boolean;
  selectedPost: string;
  listCaption: IGenerateCaption[];
  setListCaption: (listCaption: IGenerateCaption[]) => void;
}

const Generate = ({ isOpen, selectedPost, listCaption, setListCaption }: GenerateProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [tone, setTone] = useState('');

  const handleCreateCaption = async () => {
    if (!subject) {
      toast.warning('Please enter a topic');
      return;
    }
    if (!tone) {
      toast.warning('Please select a tone');
      return;
    }

    setIsLoading(true);
    const response = await createCaption({
      socialMedia: String(selectedPost),
      subject: subject,
      tone: tone,
    });

    if (response.data) {
      toast.success('Caption created successfully');
    }
    setListCaption(response.data);
    setIsLoading(false);
  };

  const optionSelect = [
    {
      id: 1,
      label: 'Friendly',
      value: 'friendly',
    },
    {
      id: 2,
      label: 'Luxury',
      value: 'luxury',
    },
    {
      id: 3,
      label: 'Relaxed',
      value: 'relaxed',
    },
    {
      id: 4,
      label: 'Professional',
      value: 'professional',
    },
    {
      id: 5,
      label: 'Bold',
      value: 'bold',
    },
    {
      id: 6,
      label: 'Adventurous',
      value: 'adventurous',
    },
    {
      id: 7,
      label: 'Witty',
      value: 'witty',
    },
    {
      id: 8,
      label: 'Persuasive',
      value: 'persuasive',
    },
    {
      id: 9,
      label: 'Empathetic',
      value: 'empathetic',
    },
  ];

  return (
    <div className={twMerge('w-1/2 px-10', isOpen ? 'block' : 'hidden')}>
      <h1 className="text-xl font-bold text-secondary mb-5">{selectedPost}</h1>
      <div>
        <div className="mb-5 flex flex-col">
          <label htmlFor="caption" className="text-base cursor-pointer text-secondary mb-2">
            What topic do you want a caption for?
          </label>
          <input
            type="text"
            id="caption"
            placeholder="Skipli is launching SkipliAI"
            onChange={e => setSubject(e.target.value)}
            className={twMerge(
              'w-full h-14 p-4 rounded-md border border-secondary/30 outline-none',
              'focus:border-blue-500 hover:border-blue-500 disabled:border-gray-300',
              'transition-all duration-300'
            )}
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="select" className="text-base cursor-pointer text-secondary mb-2">
            What should your caption sound like?
          </label>
          <select
            name=""
            id="select"
            onChange={e => setTone(e.target.value)}
            className={twMerge(
              'w-full h-14 p-4 rounded-md border border-secondary/30 outline-none',
              'focus:border-blue-500 hover:border-blue-500 disabled:border-gray-300',
              'transition-all duration-300'
            )}
          >
            <option value="">Select a tone</option>
            {optionSelect.map(item => (
              <option key={item.id} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <Button
            loading={isLoading}
            onClick={() => {
              handleCreateCaption();
            }}
            className="w-auto p-3"
          >
            Generate caption
          </Button>
        </div>
      </div>
      {listCaption.length > 0 && (
        <div className={twMerge('mt-10')}>
          <div>
            <h1 className="text-xl font-bold text-secondary mb-2">Captions generated for you</h1>
            <p className="text-sm leading-5 text-secondary max-w-md">
              Caption are built on the theme {subject}, tone {tone} and select {selectedPost}
            </p>
          </div>

          <ul className={twMerge('mt-5')}>
            {listCaption.map((item, index) => (
              <CaptionItem
                key={index}
                data={{
                  content: item.caption,
                  topic: subject,
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Generate;
