import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import FbIcon from '../../components/icons/FbIcon';
import InstagramIcon from '../../components/icons/InstagramIcon';
import TwitterIcon from '../../components/icons/TwitterIcon';
import Generate from '../../components/sections/generate';
import { IGenerateCaption } from '../../types/caption';
import DialogWaring from '../../components/common/dilog-waring';

const CaptionsFromScratch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState('');
  const [listCaption, setListCaption] = useState<IGenerateCaption[]>([]);
  const [warningTitle, setWarningTitle] = useState('');

  const isWarning = selectedPost && listCaption.length;

  const dataButton = [
    {
      icon: <FbIcon className="w-8 h-7" />,
      title: 'Facebook post',
    },
    {
      icon: <InstagramIcon className="w-8 h-7" />,
      title: 'Instagram post',
    },
    {
      icon: <TwitterIcon className="w-8 h-7" />,
      title: 'Twitter post',
    },
  ];

  return (
    <div className="flex justify-between mt-10">
      <div className={twMerge('w-1/2 sticky top-10  overflow-y-auto px-10')}>
        {/* title  */}
        <div className="mb-7">
          <h1 className="text-xl leading-8 font-bold text-secondary mb-3">
            Generate unique captions from scratch
          </h1>
          <p className="text-sm leading-5 text-secondary max-w-md">
            Choose the type of post you want a caption for, and let Skipli Al writeit for you
          </p>
        </div>
        <div>
          <p className="text-sm leading-6 text-secondary mb-4">
            What kind of post do you want a caption for?
          </p>
          <div className="flex flex-col gap-4">
            {dataButton.map(item => (
              <div
                key={item.title}
                onClick={() => {
                  if (isWarning) {
                    setWarningTitle(item.title);
                  } else {
                    setIsOpen(true);
                    setSelectedPost(item.title);
                    setListCaption([]);
                  }
                }}
                className={twMerge(
                  'flex items-center gap-4 border border-blueGray-200 w-full p-4 rounded-md transition-all duration-300 cursor-pointer',
                  selectedPost === item.title ? 'bg-blueGray-200' : 'hover:bg-blueGray-200'
                )}
              >
                {item.icon}
                <div>
                  <h1 className="text-base font-bold leading-7 text-secondary">{item.title}</h1>
                  <p className="text-sm leading-5 text-secondary">Generate caption for a post</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Generate
        isOpen={isOpen}
        selectedPost={selectedPost}
        listCaption={listCaption}
        setListCaption={setListCaption}
      />
      {warningTitle && (
        <DialogWaring
          isOpen={!!warningTitle}
          onClose={() => setWarningTitle('')}
          onConfirm={() => {
            setWarningTitle('');
            setIsOpen(true);
            setSelectedPost(warningTitle);
            setListCaption([]);
          }}
          title="Warning"
          description="This action will delete all previously generated captions. Are you sure you want to continue?"
        />
      )}
    </div>
  );
};

export default CaptionsFromScratch;
