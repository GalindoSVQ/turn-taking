import type { JSXInternal } from "preact/src/jsx";

type Props = JSXInternal.HTMLAttributes<HTMLButtonElement> & {
  text: string;
  onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
};

export function Button({ text, onClick, ...rest }: Props) {
  return (
    <button
      onClick={onClick}
      class="
    bg-bgShade2
    text-primary
    rounded
    shadow-md
    py-1
    px-3
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-opacity-75
    hover:bg-bgTint
    hover:text-primary
    disabled:opacity-50
    disabled:cursor-not-allowed
    w-full
    "
      {...rest}
    >
      {text}
    </button>
  );
}
