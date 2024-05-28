import { TD } from '@/components/table';

const CheckerRow = <T,>(props: {
  heading: string;
  checkedOption: T;
  options: T[];
  onCheck: (option: T) => void;
}) => {
  const { heading, checkedOption, options, onCheck } = props;

  return (
    <tr>
      <TD>{heading}</TD>
      {options.map((option, index) => (
        <TD key={index}>
          <input
            type="radio"
            checked={option === checkedOption}
            onChange={() => onCheck(option)}
          />
        </TD>
      ))}
    </tr>
  );
};

export default CheckerRow;
