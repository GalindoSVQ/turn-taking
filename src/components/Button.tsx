import type { JSXInternal } from "preact/src/jsx";

type Props = {
  text: string;
  onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
};

export function Button({ text, onClick }: Props) {
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
    hover:text-primary"
    >
      {text}
    </button>
  );
}
