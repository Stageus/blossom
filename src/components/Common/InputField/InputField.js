import React from "react";

// ===== styles import =====
import { Label, Span } from "../../../styles/TextStyle";
import { Input } from "../../../styles/InputStyle";
import FlexBox from "../../../styles/FlexStyle";

// ===== component =====
const InputField = ({
  fontSize,
  width,
  height,
  margin,
  padding,
  border,
  borderRadius,
  style,
  hasLabel,
  labelMessage,
  inputType,
  inputRef,
  type = "text",
  placeholderMessage,
  onChange,
  onBlur,
  onKeyDown,
  disabled,
  onValidateAndSend,
  autoFocus,
  defaultValue,
}) => {
  // === ref ===
  const numbersRef = Array(3)
    .fill()
    ?.map(() => React.createRef());

  // Set Current Date
  const currentDate = new Date().toISOString().split("T")[0];

  // Update input value
  const updateValueEvent = (e) => {
    const value = e.target.value;
    inputRef.current.value = value;
  };

  // Set Changed Phone Number and Send that
  const handleChangePhonenumber = (e) => {
    const refIndex = numbersRef.findIndex((ref) => ref.current === e.target);
    const phoneNumber = numbersRef.map((ref) => ref.current.value).join("-");

    e.target.value = e.target.value.replace(/\s|\D/g, ""); // 공백 및 숫자 이외의 문자 제거

    if (
      (refIndex === 0 && e.target.value.length === 3) ||
      (refIndex === 1 && e.target.value.length === 4)
    ) {
      const nextInput = numbersRef[refIndex + 1].current;

      if (nextInput) {
        nextInput.focus();
      }
    }

    if (refIndex === 2 && e.target.value.length > 4) {
      e.target.value = e.target.value.slice(0, 4);
    }

    onValidateAndSend(phoneNumber);
  };

  return (
    <>
      {hasLabel && <Label $fontSize={fontSize}>{labelMessage}</Label>}
      {inputType === "phone" ? (
        <FlexBox
          $row="between"
          $col="center"
          $width="100%"
          $margin={margin}
          onChange={handleChangePhonenumber}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        >
          <Input
            $padding={padding}
            $border={border}
            $borderRadius={borderRadius}
            type="text"
            placeholder="010"
            ref={numbersRef[0]}
          />
          <Span $margin="0 10px 0 10px">-</Span>
          <Input
            $padding={padding}
            $border={border}
            $borderRadius={borderRadius}
            type="text"
            placeholder="1234"
            ref={numbersRef[1]}
          />
          <Span $margin="0 10px 0 10px">-</Span>
          <Input
            $padding={padding}
            $border={border}
            $borderRadius={borderRadius}
            type="text"
            placeholder="5678"
            ref={numbersRef[2]}
          />
        </FlexBox>
      ) : (
        <Input
          $width={width}
          $height={height}
          $margin={margin}
          $padding={padding}
          $border={border}
          $borderRadius={borderRadius}
          ref={inputRef}
          type={type}
          {...(type === "date" ? { max: currentDate } : {})}
          placeholder={placeholderMessage}
          onChange={onChange || updateValueEvent}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          disabled={disabled}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          style={style}
        />
      )}
    </>
  );
};

export default InputField;
