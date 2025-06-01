import { useEffect, useState } from 'react';
import { ACCESS_TOKEN } from '../../../api/constant';
import { deleteSavedCaptions, saveCaption } from '../../../api/services/save-caption';
import Button from '../button/Button';
import { toast } from 'react-toastify';
import { ICaption } from '../../../types/caption';
import { useQueryClient } from '@tanstack/react-query';

interface CaptionItemProps {
  data: ICaption;
}

const CaptionItem = ({ data }: CaptionItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [caption, setCaption] = useState<ICaption>(data);

  const handleSave = async (id: string) => {
    setIsLoading(true);

    try {
      if (id) {
        await deleteSavedCaptions(id);
        toast.success('Caption deleted successfully');
        setIsLoading(false);
        setCaption(prev => ({
          ...prev,
          id: '',
        }));
      } else {
        const response = await saveCaption({
          content: caption.content,
          topic: caption.topic,
        });

        if (response?.data?.id) {
          setCaption(response.data);
          toast.success('Caption saved successfully');
          setIsLoading(false);
        }
      }
      queryClient.invalidateQueries({ queryKey: ['saved-captions'] });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const shareViaEmail = (content: string) => {
    const subject = encodeURIComponent('Check out this caption!');
    const body = encodeURIComponent(content);
    const mailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailUrl;
  };

  useEffect(() => {
    setCaption(prev => ({
      ...prev,
      content: caption.content,
      topic: caption.topic,
    }));
  }, [caption.content, caption.topic]);

  return (
    <li className="p-5 border border-blueGray-200 mb-4 rounded-md shadow-md flex flex-col justify-between gap-3">
      <p className="text-secondary mb-2b max-w-sm">{caption.content}</p>
      <div className="flex items-center justify-end gap-2">
        <Button
          onClick={() => shareViaEmail(caption.content)}
          color="white"
          size="sm"
          className="w-auto px-5"
        >
          Share
        </Button>

        <Button
          loading={isLoading}
          onClick={() => handleSave(caption.id || '')}
          color={caption.id ? 'accent' : 'primary'}
          size="sm"
          className="w-auto px-5"
        >
          {caption.id ? 'Unsave' : 'Save'}
        </Button>
      </div>
    </li>
  );
};

export default CaptionItem;
