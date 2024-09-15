import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onChange, title, description, children }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogPortal>
        <DialogOverlay
          className="
                bg-neutral-900/90
                backdrop-blur-sm
                fixed
                inset-0
                "
        />
        <DialogContent
          className="
                fixed
                drop-shadow-md
                border
                border-neutral-700
                top-[50%]
                left-[50%]
                max-h-full
                h-full
                md:h-auto
                md:max-h-[85vh]
                w-full
                md:w-[90vw]
                md:max-w-[450px]
                translate-x-[-50%]
                translate-y-[-50%]
                
                bg-neutral-800
                p-[25px]
                focus:outline-none
                "
        >
          <DialogHeader>
            <DialogTitle
              className="
                    text-xl
                    text-center
                    font-bold
                    mb-4
                    "
            >
              {title}
            </DialogTitle>
            <DialogDescription
              className="
                    mb-5 
                    text-sm
                    leading-normal
                    text-center
                    "
            >
              {description}
            </DialogDescription>
          </DialogHeader>
          <div>{children}</div>
          <DialogClose asChild>
            <button
              className="
                        text-neutral-400
                        hover:text-white
                        absolute
                        top-[10px]
                        right-[10px]
                        inline-flex
                        h-[25px]
                        w-[25px]
                        appearance-none
                        items-center
                        justify-center
                        
                        focus:outline-none
                        "
            >
              <IoMdClose />
            </button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
