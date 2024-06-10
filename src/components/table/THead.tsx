import { FC } from 'react';
import { TH } from '.';

export type THeadProps = {
  headings: string[];
};

const THead: FC<THeadProps> = (props) => {
  const { headings } = props;

  return (
    <thead>
      <tr className="border rounded">
        {headings.map((heading, index) => (
          <TH key={index}>{heading}</TH>
        ))}
      </tr>
    </thead>
  );
};

export default THead;
