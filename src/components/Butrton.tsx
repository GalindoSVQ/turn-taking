import type { JSXInternal } from "preact/src/jsx";

type Props = JSXInternal.HTMLAttributes<HTMLButtonElement> & {
  text: string;
  onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
};
function Button({ text, onClick, ...rest }: Props) {
  return (
    <button
      class="inline-block rounded-full border-2 border-warning px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-warning transition duration-150 ease-in-out hover:border-warning-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-warning-600 focus:border-warning-600 focus:text-warning-600 focus:outline-none focus:ring-0 active:border-warning-700 active:text-warning-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
      onClick={onClick}
      {...rest}
    >
      {text}
    </button>
  );
}

export { Button };
