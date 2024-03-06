
import { Formik, Form , Field, FieldArray, ErrorMessage } from "formik"
import * as Yup from 'yup';
import {useDispatch} from 'react-redux'
import { addGroup, addCard } from "../redux/features/cardSlice"
import { nanoid } from "@reduxjs/toolkit"
import {RiDeleteBin2Line} from 'react-icons/ri'
import {CiEdit} from 'react-icons/ci'
import {BiAddToQueue} from 'react-icons/bi'
import { useRef } from "react";
import {LiaFileUploadSolid} from 'react-icons/lia'

function CreatePage() {
  const dispatch = useDispatch()
  // const groups = useSelector((state) => state.groups);

  const validationSchema = Yup.object().shape({
    groupName: Yup.string()
      .min(1, 'Term must be at least 1 characters')
      .max(50, 'Term must be at most 50 characters')
      .required('*Term is required'),
    groupDescription: Yup.string()
      .min(30, 'Definition must be at least 5 characters')
      .max(200, 'Definition must be at most 200 characters')
      .required('Definition is required'),
      cards: Yup.array().of(
        Yup.object().shape({
          term: Yup.string()
            .min(1, 'Term must be at least 1 character')
            .max(50, 'Term must be at most 50 characters')
            .required('Term is required'),
          definition: Yup.string()
            .min(20, 'Definition must be at least 20 characters')
            .max(250, 'Definition must be at most 250 characters')
            .required('Definition is required'),
        }))
  });


const focusRef = useRef(null);

const handleGroupImage = (imageFile, formikProps) => {
  const reader = new FileReader();
  reader.onload = () => {
    const mainGroupImage = {
      name: imageFile.name,
      mainImageURL: URL.createObjectURL(imageFile),
      mainImage: reader.result,
    };
    formikProps.setFieldValue("groupImage", mainGroupImage);
  };
  reader.readAsDataURL(imageFile);
};

const handleCardImage = (imageFile, formikProps, index) => {
  const reader = new FileReader();
  reader.onload = () => {
    const cardImage = {
      name: imageFile.name,
      cardImageURL: URL.createObjectURL(imageFile),
      cardImage: reader.result,
    };
    formikProps.setFieldValue(`cards[${index}].cardImage`, cardImage);
  };
  reader.readAsDataURL(imageFile);
};

  return (
    <div className="container mx-auto">
      <Formik
        initialValues={{
          term: "",
          definition: "",
          groupName: "",
          groupDescription: "",
          groupImage: null,
          cards: [{ term: "", definition: "", cardImage: null }],
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newGroup = {
            groupId: nanoid(),
            groupName: values.groupName,
            groupDescription: values.groupDescription,
            groupImage: values.groupImage,
            noOfCards: values.cards.length
          };
          // Dispatch the action to add the group
          dispatch(addGroup(newGroup));
          // localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
          // Dispatch the action to add each card
          values.cards.forEach((card) => {
            dispatch(
              addCard({
                cardName: card.term,
                cardDescription: card.definition,
                cardImage: card.cardImage,
                groupId: newGroup.groupId,
              })
            );
          });

          resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <div className="bg-gray-50 w-[100%] m-auto p-8 mt-10 drop-shadow-xl rounded-sm ">
              <label htmlFor="createGroup" className="font-bold text-gray-500">
                Create Group*
              </label>
              <div className="flex gap-x-[10%] flex-col sm:flex-row">
                <div>
                  <Field
                    className="border-black border-2 p-1 mt-2 mb-1 h-10 w-[100%]"
                    name="groupName"
                    type="text"
                    id="createGroup"
                  />
                  <ErrorMessage
                    name="groupName"
                    component="div"
                    className="text-red-500 font-semibold ml-3"
                  />
                </div>
                <div>
                  {formikProps.values.groupImage ? (
                    <div className="mt-2">
                      <img
                        src={formikProps.values.groupImage.mainImage}
                        alt="Selected"
                        className="w-32 h-32 object-cover"
                      />
                    </div>
                  ) : (
                    <label className=" flex items-baseline px-2 py-2 border-solid border-2 border-blue-600 text-blue-600 font-semibold rounded cursor-pointer mt-2">
                      <span className="flex px-2 gap-x-3">
                        <LiaFileUploadSolid size={25} />
                        Upload Image
                      </span>
                      <input
                        type="file"
                        name="groupImage"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>handleGroupImage(e.target.files[0], formikProps) }
                      />
                    </label>
                  )}{" "}
                </div>
              </div>
              <br />
              <label htmlFor="createGroup" className="font-bold text-gray-500">
                Add Description
              </label>
              <br />
              <Field
                className="border-black border-2 w-[100%] lg:w-[90%] h-24 p-1 mt-2"
                name="groupDescription"
                as="textarea"
                id="createGroup"
              />
              <ErrorMessage
                name="groupDescription"
                component="div"
                className="error"
              />
            </div>
            <div className="flex flex-wrap gap-10 bg-gray-50 w-[100%] m-auto p-8 mt-5 rounded-sm">
              <FieldArray name="cards">
                {({ push, remove }) => (
                  <div className="w-full">
                    {formikProps.values.cards.map((card, index) => (
                      <div className="flex flex-col xl:flex-row gap-x-4" key={index}>
                        <div className="bg-red-600 text-lg text-white font-bold w-10 h-9 pt-1 rounded-full text-center">
                          {index + 1}
                        </div>
                        <div>
                          <label
                            htmlFor={`cards[${index}].term`}
                            className="font-bold text-gray-500"
                          >
                            Enter Term*
                          </label>
                          <Field
                            className="border-black border-2 w-[100%] p-1 mt-2"
                            name={`cards[${index}].term`}
                            type="text"
                            innerRef={focusRef}
                          />
                          <ErrorMessage
                            name={`cards[${index}].term`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <div className="w-full xl:w-[46%] h-32">
                          <label
                            htmlFor={`cards[${index}].definition`}
                            className="font-bold text-gray-500"
                          >
                            Enter Definition*
                          </label>
                          <Field
                            className="border-black border-2 w-full p-1 mt-2"
                            name={`cards[${index}].definition`}
                            as="textarea"
                          />
                          <ErrorMessage
                            name={`cards[${index}].definition`}
                            component="div"
                            className="error"
                          />
                        </div>
              
                        {card.cardImage ? (
                          <img
                            src={card.cardImage.cardImage}
                            alt={`Card ${index + 1}`}
                            className="w-32 h-32 object-cover mt-2"
                          />
                        ) : (
                          <label className="flex items-baseline px-2 py-2 border-solid border-2 border-blue-600 text-blue-600 font-semibold rounded cursor-pointer h-full xl:my-auto">
                            <span className="flex items-center gap-1">
                              <LiaFileUploadSolid size={25} className="text-blue-600" />
                              <span>Upload Image</span>
                            </span>
                            <input
                              hidden
                              id={`cards[${index}].cardImage`}
                              name={`cards[${index}].cardImage`}
                              type="file"
                              accept="image/*"
                              onChange={(event) =>
                                handleCardImage(
                                  event.target.files[0],
                                  formikProps,
                                  index
                                )
                              }
                              onBlur={formikProps.handleBlur}
                            />
                          </label>
                        )}
                 
                        <div className="flex flex-row gap-x-6 xl:flex-col mt-5 m-auto gap-y-3">
                          <button type="button" onClick={() => remove(index)}>
                            <RiDeleteBin2Line size={30} color="red" />
                          </button>
                          <button
                            type="button"
                            onClick={() => focusRef.current.focus()}
                          >
                            <CiEdit
                              className="m-x-auto"
                              size={33}
                              color="red"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ term: "", definition: "" })}
                      className="text-red-500 ml-[5.5%] flex font-semibold"
                    >
                      <BiAddToQueue size={30} className="p-1" />
                      Add More
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>
            <button
              className="bg-red-600 m-auto text-white flex justify-center mt-5 mb-5 px-[70px] py-2 rounded-sm"
              type="submit"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePage






