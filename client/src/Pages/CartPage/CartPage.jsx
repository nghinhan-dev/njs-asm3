import { useRef } from "react";
// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
// shared component
import OtherBanner from "../../Shared/OtherBanner";
import { useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../../store/services";
import CartItem from "./CartItem";

export default function CartPage() {
  const { data, isLoading, isSuccess, isError, error } = useGetCartQuery();
  const navigate = useNavigate();
  const couponRef = useRef();

  let bodyContent;
  let subContent;

  if (isLoading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else if (isSuccess) {
    const { items, totalPrice } = data;

    const renderCartList = items.map((itemDetail) => {
      const { item, quantity } = itemDetail;
      return <CartItem key={item._id} item={item} quantity={quantity} />;
    });

    bodyContent = <tbody>{renderCartList}</tbody>;
    subContent = (
      <Col md="4" xl="4">
        <div className="bg-light text-uppercase p-4">
          <h3 className="mb-3">CART TOTAL</h3>
          <div className="d-flex align-items-center justify-content-between">
            <h5>subtotal</h5>
            <p className="price opacity-75">
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
            </p>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <h5>total</h5>
            <p className="price">
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
            </p>
          </div>
          <input
            className="py-2 ps-3 w-100 mt-3"
            type="text"
            placeholder="Enter your coupon"
            ref={couponRef}
          />
          <button className="py-2 w-100 bg-black text-white">
            <i className="fa-solid fa-gift me-2"></i>
            Apply coupon
          </button>
        </div>
      </Col>
    );
  } else if (isError) {
    bodyContent = <div>{error.toString()}</div>;
  }

  return (
    <>
      <OtherBanner bigTitle={"CART"} smallTitle={"CART"} />
      {/* cart UI */}
      <Container className="py-4">
        <h5 className="py-3">SHOPPING CART</h5>
        <Row className="flex-nowrap">
          {/* cart detail */}
          <Col md="8" xl="8">
            <Table id="cartTable" striped className="align-middle">
              <thead className="text-uppercase">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>REMOVE</th>
                </tr>
              </thead>
              {bodyContent}
            </Table>
          </Col>
          {/* cart total */}
          {subContent}
          {/**/}
        </Row>
        <Row>
          <Col md="8" xl="8">
            <div className="bg-light py-3 cartNav d-flex align-items-center justify-content-between">
              <div
                onClick={() => {
                  navigate("/shop");
                }}
                className="d-flex align-items-center justify-content-between"
              >
                <i className="ps-2 fa-solid fa-arrow-left"></i>
                <p className="px-3">Continue Shopping</p>
              </div>
              <div
                onClick={() => {
                  navigate("/checkout");
                }}
                className="d-flex align-items-center justify-content-between"
              >
                <p className="px-3">Proceed to checkout</p>
                <i className="pe-2 fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
