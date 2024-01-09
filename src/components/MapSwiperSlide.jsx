export default (props) => {
  return (
    <>
      <a href={"/maps/" + props.map.data.dcMetadata.id}>
        {props.map.data.dcMetadata.exemplary_image_ssi &&
          <div class="related-map" style={{backgroundImage: "url('https://bpldcassets.blob.core.windows.net/derivatives/images/" + props.map.data.dcMetadata.exemplary_image_ssi + "/image_thumbnail_300.jpg')"}}></div>
        }
        {props.map.data.dcMetadata.title_info_primary_tsi &&
          <p class="related-map-description">{props.map.data.dcMetadata.title_info_primary_tsi}</p>
        }
      </a>
    </>
  );
};