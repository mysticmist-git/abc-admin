import { TD } from "@/components/table";
import { Grade } from "@/config/erd";

const CheckerRow = (props: {
  value: Grade;
  heading: string;
  options: Grade[];
  onCheck: (option: Grade) => void;
}) => {
  const { value, heading, options, onCheck } = props;

  const onChange = (option: Grade) => () => {
    onCheck(option);
  };
  return (
    <tr>
      <TD>{heading}</TD>
      {options.map((option, index) => (
        <TD key={index}>
          <input
            type="radio"
            value={value}
            checked={value === option}
            onChange={onChange(option)}
          />
        </TD>
      ))}
    </tr>
  );
};

export default CheckerRow;
