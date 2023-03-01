type Props = {
  text: string;
};

export function Button({ text }: Props) {
  return (
    <button
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
