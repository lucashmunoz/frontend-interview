import { useState } from "react";
import icons from "../../assets/icons";

const { btnAdd } = icons;

interface AddNewInputProps {
  /** Input text value */
  inputValue: string
  /** Callback called on input change event */
  onInputChange: (e: React.FormEvent<HTMLInputElement>) => void
  /** Input placeholder text */
  inputPlaceholder: string
  /** Callback called on form submit */
  onSubmit: () => void
  /** Button aria label for accessible name */
  buttonAriaLabel: string
}

const AddNewInput = ({
  inputValue,
  onInputChange,
  inputPlaceholder,
  onSubmit,
  buttonAriaLabel
}: AddNewInputProps) => {
  /*
  * Since the component's border is in the box containing both input and icon button,
  * the input outline has to be removed in favor of changing the color of the box borders
  * on input focus, giving the sense of it being the input outline.
  *
  * If not then the input focus outline will cover only a part of the wrapper box, ending just before the icon button.
  */
  const [isInputOnFocus, setIsInputOnFocus] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if(inputValue.length !== 0) {
      onSubmit();
    }
  };

  return (
    <form
      className={`border-2 ${isInputOnFocus ? "border-yellow" : "border-black" }  rounded-3xl w-full flex overflow-hidden`}
      onSubmit={handleSubmit}
    >
      <input
        className="w-full py-2 px-4 outline-none"
        placeholder={inputPlaceholder}
        value={inputValue}
        onFocus={() => setIsInputOnFocus(true)}
        onBlur={() => setIsInputOnFocus(false)}
        onChange={onInputChange}
      />
      <button type="submit" aria-label={buttonAriaLabel}>
        <img src={btnAdd} className="h-10 w-10"/>
      </button>
    </form>
  );
};

export default AddNewInput;
