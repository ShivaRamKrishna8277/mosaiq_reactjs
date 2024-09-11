export default function InputField({
  id,
  labelText,
  inputGroupText,
  type,
  placeholder,
  value,
  isDisabled,
  name,
  onchange,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <div className="input-group mb-3">
        <span className="input-group-text" id={id}>
          {inputGroupText}
        </span>
        <input
          type={type}
          className="form-control shadow-none py-2"
          name={name}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby={id}
          defaultValue={value}
          disabled={isDisabled ? true : undefined}
          onChange={onchange}
        />
      </div>
    </div>
  );
}
