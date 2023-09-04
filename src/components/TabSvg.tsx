import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

export const HomeTabSvg = (props: any) => (
  <Svg xmlns='http://www.w3.org/2000/svg' width={21} height={21} fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path fill='#fff' d='M0 0h21v21H0z' />
      <Path
        fill={props.color}
        fillRule='evenodd'
        d='M17.546 17.919c0 .61-.526.87-1.174.87h-1.175c-.648 0-1.174-.26-1.174-.87v-1.106c0-1.22-1.051-2.444-2.349-2.444H9.326c-1.298 0-2.349 1.223-2.349 2.444v1.106c0 .61-.526.87-1.174.87H4.628c-.648 0-1.174-.26-1.174-.87V9.007a.54.54 0 0 1 .171-.391l6.033-5.677a1.225 1.225 0 0 1 1.66 0l6.057 5.699a.54.54 0 0 1 .171.39v8.89Zm2.349-9.491c0-.293-.124-.573-.342-.78L12.156.65C11.24-.214 9.752-.218 8.832.645L1.451 7.569c-.221.208-.346.489-.346.783v10.672C1.105 20.245 2.156 21 3.454 21h3.523c1.298 0 2.349-.755 2.349-1.976v-1.105c0-.61.526-1.106 1.174-1.106.648 0 1.174.496 1.174 1.106v1.105c0 1.221 1.051 1.976 2.349 1.976h3.523c1.298 0 2.349-.755 2.349-1.976V8.428Z'
        clipRule='evenodd'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h21v21H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)

export const ProfileSvgComponent = (props: any) => (
  <Svg xmlns='http://www.w3.org/2000/svg' width={21} height={21} fill='none' {...props}>
    <G clipPath='url(#a)'>
      <Path
        fill={props.color}
        fillRule='evenodd'
        d='M17.39 18.9H3.61c-.742 0-1.29-.732-1.01-1.405 1.298-3.112 4.348-4.895 7.9-4.895 3.553 0 6.602 1.783 7.9 4.895.28.673-.268 1.405-1.01 1.405ZM6.213 6.3c0-2.316 1.924-4.2 4.288-4.2 2.364 0 4.287 1.884 4.287 4.2 0 2.316-1.923 4.2-4.287 4.2S6.213 8.616 6.213 6.3Zm14.741 12.218c-.779-3.527-3.216-6.13-6.424-7.311 1.7-1.341 2.691-3.51 2.327-5.884C16.433 2.57 14.095.365 11.272.044 7.374-.4 4.069 2.571 4.069 6.3c0 1.984.939 3.753 2.403 4.907-3.21 1.18-5.645 3.784-6.426 7.31C-.237 19.8.818 21 2.156 21h16.687c1.34 0 2.395-1.2 2.11-2.482Z'
        clipRule='evenodd'
      />
    </G>
    <Defs>
      <ClipPath id='a'>
        <Path fill='#fff' d='M0 0h21v21H0z' />
      </ClipPath>
    </Defs>
  </Svg>
)

export const LeftArrowSvgComponent = (props: any) => (
  <Svg xmlns='http://www.w3.org/2000/svg' width={25} height={22} fill='none' {...props}>
    <Path
      stroke='#000'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m7.365 6.417-3.72 4.01 3.72 4.01M17.5 10.427H5.323'
    />
  </Svg>
)
