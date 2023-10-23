import GalleryButtons from "@/interfaces/GalleryButtons";

const galleryButtons = ({
  count,
  changeImage,
  currentIndex,
  dogImage,
}: GalleryButtons) => {
  return count > 1 ? (
    <div className="d-flex justify-content-center mt-4">
      <button
        className="btn btn-outline-dark me-3 app-btn -fixed-width"
        onClick={() => changeImage(-1)}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <button
        className="btn btn-outline-dark app-btn -fixed-width"
        onClick={() => changeImage(1)}
        disabled={
          dogImage.message.length - 1 === currentIndex &&
          dogImage.message.length !== 0
        }
      >
        Next
      </button>
    </div>
  ) : null;
};
export default galleryButtons;
