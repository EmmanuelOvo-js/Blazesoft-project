import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBook, openModal, udpatedBook } from "./books";

function BookModal() {
  const modalState = useSelector((state) => state.books.modalController);
  const newEntry = useSelector((state) => state.books.bookEntry);
  const selectedBook = useSelector((state) => state.books.selectBook);
  const storeTrigger = useDispatch();
  return (
    <div>
      <Modal
        show={modalState}
        onHide={() => storeTrigger(openModal())}
        centered
        keyboard={false}>
        <Modal.Header closeButton>
          {newEntry ? "Add A New Book" : "Edit Book Details"}
        </Modal.Header>
        <Modal.Body>
          <Form
            id='bookForm'
            onSubmit={async (e) => {
              e.preventDefault();
              const formEntry = e.target.elements;
              const formData = newEntry
                ? {
                    name: formEntry?.bookname.value,
                    price: formEntry?.price.value,
                    category: formEntry?.category.value,
                    description: formEntry?.description.value,
                  }
                : {
                    bookIndex: selectedBook.bookNumber,
                    bookDetails: {
                      name: formEntry?.bookname.value,
                      price: formEntry?.price.value,
                      category: formEntry?.category.value,
                      description: formEntry?.description.value,
                    },
                  };
              console.log(formData);
              newEntry
                ? await storeTrigger(addBook(formData))
                : await storeTrigger(udpatedBook(formData));
              e.target.reset();
              storeTrigger(openModal());
            }}>
            <FloatingLabel
              className='mb-3'
              name='bookname'
              controlId='bookname'
              label='Title'>
              <Form.Control
                type='text'
                required
                defaultValue={selectedBook?.bookDetails.name}
                placeholder='Title'></Form.Control>
            </FloatingLabel>
            <Row>
              <Col md={6}>
                <FloatingLabel
                  className='mb-3'
                  name='price'
                  controlId='price'
                  label='Price'>
                  <Form.Control
                    type='number'
                    required
                    defaultValue={selectedBook?.bookDetails.price}
                    placeholder='Price'></Form.Control>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel
                  className='mb-3'
                  name='category'
                  controlId='category'
                  label='Category'>
                  <Form.Control
                    type='text'
                    required
                    defaultValue={selectedBook?.bookDetails.category}
                    placeholder='Category'></Form.Control>
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel
              className='mb-3'
              name='description'
              controlId='description'
              label='Description'>
              <Form.Control
                as='textarea'
                required
                placeholder='Description'
                defaultValue={selectedBook?.bookDetails.description}
                style={{ height: "80px" }}></Form.Control>
            </FloatingLabel>
            <Button variant='primary' type='submit'>
              {newEntry ? (
                <>
                  <i className='bi bi-journal-plus'></i> Add A Book
                </>
              ) : (
                <>
                  <i className='bi bi-journal-plus'></i> Update Book Details
                </>
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookModal;