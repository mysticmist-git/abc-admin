import clsx from 'clsx';
import { FC } from 'react';
import { LuUser2 } from 'react-icons/lu';

export type NavigationSidebarItemProps = {
  active?: boolean;
  text: string;
};

const NavigationSidebarItem: FC<NavigationSidebarItemProps> = ({
  text,
  active,
}) => {
  const containerCss = clsx('border-l-4', 'px-4 py-2', 'text-lg font-bold', {
    'border-neutral-100': !active,
    'border-primary-400': active,
  });

  const labelContainerCss = clsx(
    'flex items-center gap-2',
    'rounded-lg',
    'px-3 py-1',
    'transition-colors',
    {
      'text-neutral-600 hover:text-primary-600': !active,
      'bg-primary-200 text-primary-600': active,
    }
  );

  return (
    <div className={containerCss}>
      <div className={labelContainerCss}>
        <span>{<LuUser2 className="w-5 h-5" />}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default NavigationSidebarItem;
