type Props = {
  progress: number;
};

function Progressbar({ progress }: Props) {
  return (
    <div class="mt-2 h-2 w-60 bg-bgTint rounded-lg">
      <div
        class="h-2 bg-primary rounded-lg"
        style={`width: ${progress}%`}
      ></div>
    </div>
  );
}

export { Progressbar };
