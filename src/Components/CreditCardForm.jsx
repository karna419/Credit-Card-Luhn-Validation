import React from "react";
import useForm from "../useForm";
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreditCardForm.css";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const CreditCardForm = () => {
  const { handleChange, handleFocus, handleSubmit, values, errors, loading } =
    useForm();
  console.log({ loading, errors });
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await handleSubmit(e); // Call the original handleSubmit function

    // Note: If you need to perform any additional actions after validation,
    // you can do so here.
  };

  return (
    <div>
      <div className="container">
        <div className="box justify-content-center align-items-center">
          <div className="formDiv">
            <div className="creditCard">
              <Cards
                cvc={values.cardSecurityCode}
                expiry={values.cardExpiration}
                focused={values.focus}
                name={values.cardName}
                number={values.cardNumber}
              />
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="cardName"
                  data-testid="cardName"
                  name="cardName"
                  placeholder="Cardholder Name"
                  value={values.cardName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cname}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  id="cardNumber"
                  data-testid="cardNumber"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={values.cardNumber}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  isValid={errors.cnumber}
                />
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      name="cardType"
                      id="cardType"
                      data-testid="cardType"
                      placeholder="Card Type"
                      value={values.cardType}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      isValid={errors.ctype}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      id="cardExpiration"
                      data-testid="cardExpiration"
                      name="cardExpiration"
                      placeholder="Expiration Date"
                      value={values.cardExpiration}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      isValid={errors.cexp}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="number"
                      id="cardSecurityCode"
                      data-testid="cardSecurityCode"
                      name="cardSecurityCode"
                      placeholder="Security Code"
                      value={values.cardSecurityCode}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      isValid={errors.ccvv}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      id="cardPostalCode"
                      data-testid="cardPostalCode"
                      name="cardPostalCode"
                      placeholder="Postal Code"
                      value={values.cardPostalCode}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      isValid={errors.cpostal}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                size={"block"}
                data-testid="validateButton"
                id="validateButton"
                type="submit"
              >
                {loading ? "Validating" : "Validate"}
              </Button>
            </Form>
          </div>
          {errors.show === true && (
            <Alert
              id="alertMessage"
              data-testid="alertMessage"
              variant={errors.variant}
              show={errors.show}
            >
              {errors.message}
            </Alert>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
