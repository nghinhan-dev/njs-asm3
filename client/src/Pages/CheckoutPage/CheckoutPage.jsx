import OtherBanner from "../../Shared/OtherBanner";
// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useGetCartQuery } from "../../store/services";
// redux

export default function CheckoutPage() {
  const { data, isLoading, isSuccess, isError, error } = useGetCartQuery();

  let content;

  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    const { items, totalPrice } = data;

    const renderCheckoutList = items.map((itemDetail) => {
      const { item, quantity } = itemDetail;
      return (
        <>
          <div
            key={item._id}
            className="d-flex align-items-center justify-content-between"
          >
            <h6 className="w-50">{item.name}</h6>
            <p className="price opacity-75">
              {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
              x{quantity}
            </p>
          </div>
          <hr className="my-2" />
        </>
      );
    });

    content = (
      <>
        <div className="bg-light text-uppercase p-4">
          <h3 className="mb-3">YOUR ORDER</h3>
          {renderCheckoutList}
          <div className="mt-4 d-flex align-items-center justify-content-between">
            <h5>TOTAL</h5>
            <p className="fs-4 price opacity-75">
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
            </p>
          </div>
        </div>
      </>
    );
  } else if (isError) {
    content = <h3>{error.toString()}</h3>;
  }

  return (
    <>
      <OtherBanner
        bigTitle={"CHECKOUT"}
        smallTitle={"CHECKOUT"}
        subName="HOME / CART / "
      />
      <Container className="py-4">
        <Row className="flex-nowrap py-3">
          {/* checkout form */}
          <Col md="7" xl="7">
            <h5>BILLING DETAILS</h5>
            <form id="checkoutForm">
              <label>
                FULL NAME:
                <input
                  type="text"
                  placeholder={"Enter Your Full Name"}
                  // defaultValue={currentUser.fullName}
                />
              </label>
              <label>
                EMAIL:
                <input
                  type="text"
                  placeholder={"Enter Your Email"}
                  // defaultValue={currentUser.email}
                />
              </label>
              <label>
                PHONE NUMBER:
                <input
                  type="text"
                  placeholder={"Enter Your Phone Number"}
                  // defaultValue={currentUser.phone}
                />
              </label>
              <label>
                ADDRESS:
                <input type="text" placeholder={"Enter Your Address"} />
              </label>
              <button className="btn bg-black text-white">Place Order</button>
            </form>
          </Col>
          {/* checkout total */}
          <Col md="5" xl="5">
            {content}
          </Col>
        </Row>
      </Container>
    </>
  );
}
