export const backgroundStyleFunc = (
  imageBol?: boolean,
  readerBackground?: {
    background: string | undefined
    typeFont: string | undefined
  }
) =>
  imageBol
    ? {
        backgroundImage: readerBackground?.background ? `url(${readerBackground?.background})` : undefined,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: readerBackground?.typeFont ? readerBackground?.typeFont : undefined
      }
    : {
        background: readerBackground?.background ? readerBackground?.background : undefined,
        color: readerBackground?.typeFont ? readerBackground?.typeFont : undefined
      }
