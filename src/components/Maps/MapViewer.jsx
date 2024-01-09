import Viewer from '@samvera/clover-iiif/viewer';

export default (props) => {
  return (
    <div className="map-viewer mb-5 w-full">
      <span className="sr-only">{props.manifest}</span>
      <Viewer
        iiifContent={props.manifest}
        options={{
          canvasHeight: '580px',
          showTitle: false,
          showIIIFBadge: false,
          informationPanel: {
            open: false,
            renderAbout: false,
            renderSupplementing: false,
            renderToggle: false
          }
        }}
        customTheme={{
          colors: {
            primary: "#4e798d",
            primaryMuted: "#436477",
            primaryAlt: "#436477",
            accent: "#4e798d",
            accentMuted: "#436477",
            accentAlt: "#436477",
            secondary: "#FFFFFF",
            secondaryMuted: "#e7e7e7",
            secondaryAlt: "#707070",
          },
          fonts: {
            sans: 'basic-sans, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            display: 'mokoko-variable, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          },
        }}
      />
    </div>
  );
};
