import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Button from '../../components/common/button/Button';
import InputField from '../../components/common/input/InputField';
import { createIdea } from '../../api/services/idea';
import { toast } from 'react-toastify';
import { IListIdea } from '../../types/idea';
import GenerateCaptionByIdea from '../../components/sections/generate/GenerateCaptionByIdea';

const Inspired = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCaption, setOpenCaption] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState('');
  const [idea, setIdea] = useState('');
  const [ideaGenerated, setIdeaGenerated] = useState<IListIdea[]>([]);

  const handleGenerateIdea = async () => {
    if (!idea) {
      toast.warning('Please enter a topic');

      return;
    }
    setIsLoading(true);

    try {
      const response = await createIdea({
        idea: idea,
      });
      toast.success('Idea generated successfully');
      setIsOpen(true);
      setIsLoading(false);
      setIdeaGenerated(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-5 pt-10 h-full bg-gray-100">
        <div className="w-2/5 sticky top-10 max-h-screen overflow-y-auto pl-10">
          <h1>Get Inspired</h1>
          <p className="mb-7">
            Stick staring at a blank page? Tell us what topic you have in mind and Skipli AI will
            generate a list of post ides and captions for you.
          </p>
          <div className="flex flex-col gap-4">
            <label htmlFor="idea">What topic do you want a caption for?</label>
            <InputField
              type="text"
              id="idea"
              sizes="lg"
              placeholder="Enter your topic"
              value={idea}
              onChange={e => setIdea(e.target.value)}
            />
          </div>
          <Button
            loading={isLoading}
            onClick={() => {
              handleGenerateIdea();
            }}
            size="lg"
            className="w-auto mt-5"
          >
            Generate ideas
          </Button>
        </div>
        <div
          className={twMerge(
            'w-3/5 sticky top-10 max-h-screen overflow-y-auto px-10',
            isOpen ? 'block' : 'hidden'
          )}
        >
          <div>
            <div className="mb-7">
              <h2 className="text-xl leading-8 font-bold text-secondary mb-3">
                Generated ideas for your post
              </h2>
            </div>
            <div>
              <p className="text-sm  text-secondary font-semibold mb-4">
                Choose an idea to build some posts:
              </p>
              <ul>
                {ideaGenerated.map((item, index) => (
                  <li
                    key={index}
                    className={twMerge(
                      'border border-blueGray-200 text-sm rounded-md p-4 mb-4 cursor-pointer shadow-md',
                      selectedIdea === String(item.post_idea)
                        ? 'bg-blueGray-200'
                        : 'hover:bg-blueGray-200'
                    )}
                    onClick={() => {
                      setSelectedIdea(String(item.post_idea));
                      setOpenCaption(true);
                    }}
                  >
                    {item.post_idea}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <GenerateCaptionByIdea
            isOpen={openCaption}
            selectedIdea={selectedIdea}
            setGenerate={setOpenCaption}
            generate={openCaption}
          />
        </div>
      </div>
    </>
  );
};

export default Inspired;
