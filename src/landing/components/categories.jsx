import { Container } from "react-bootstrap";
import categoriesData from "../../assets/data/categoriesData";

export default function Categories() {
  return (
    <Container>
      <div className="categories_section py-5 text-center">
        <div className="container-fluid p-0">
          <div className="title_wrapper mb-5">
            <p className="section_title">
              Fields You Can <span>Master</span>
            </p>
            <p className="section_sub_title">
              Various fields where you can leverage your skills and brighten
              your future.
            </p>
          </div>
          <div className="row g-0 row-cols-md-4 row-cols-2 row-gap-4">
            {categoriesData.map((category) => (
              <div className="col" key={category.id}>
                <div className="category_box bg-white">
                  <img
                    src={category.imgSrc}
                    alt={category.Category}
                    className="category_img"
                  />
                  <p className="category_title">{category.Category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
