"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Button,
  Chip,
  Image,
  Input,
  RadioGroup,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import LocationLabel from "../components/LocationLabel";
import { validateNumber } from "@/utils/phone";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { CREATE_CUSTOMER_LOCATION } from "@/graphql/mutation/delivery";
import { useAuth } from "@/context/useAuth";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map"), {
  ssr: false,
});

const initialNewPhone = {
  phoneNumber: "",
  isInternal: false,
  isVerified: false,
  isActived: false,
  isBanned: false,
};

interface FormCreateLocation {
  addressName: string;
  email: string;
  firstName: string;
  lastName: string;
  lat: number;
  lng: number;
  phoneNumber: string;
  photos?: string[] | null;
  label?: string;
}

export default function PageLocation() {
  const [position, setPosition] = useState<L.LatLngExpression | any>([
    11.562108, 104.888535,
  ]);
  const [addressName, setAddressName] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useAuth();
  const [newPhone, setNewPhone] = useState(initialNewPhone);
  // const [isBlurred, setIsBlurred] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [operator, setOperator] = useState("");
  const [color, setColor] = useState<"warning" | "success" | "danger" | null>(
    null
  );
  const [photo, setPhoto] = useState<string>("");
  const [email, setEmail] = useState("");
  // const [files, setFiles] = useState();
  const [addressLabel, setAddressLabel] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormCreateLocation>();

  // mutation create address

  const [storeCreateAddress] = useMutation(CREATE_CUSTOMER_LOCATION);

  // phone validator
  useEffect(() => {
    if (operator.toLocaleLowerCase() === "cellcard") {
      setColor("warning");
    }
    if (operator.toLocaleLowerCase() === "smart") {
      setColor("success");
    }
    if (operator.toLocaleLowerCase() === "metfone") {
      setColor("danger");
    }
  }, [operator]);

  useEffect(() => {
    setValue("addressName", addressName);
    setValue("phoneNumber", newPhone.phoneNumber);
  }, [addressName, newPhone]);

  useEffect(() => {
    if (newPhone.phoneNumber !== "") {
      try {
        const valid = validateNumber({ phoneNumber: newPhone.phoneNumber });
        if (valid.name) {
          setIsValid(true);
          setValidationMessage("");
          setOperator(valid.name);
        }
      } catch (error: any) {
        if (error) {
          setIsValid(false);
          setValidationMessage(error.detail.message);
          setOperator("");
        }
      }
    }
  }, [newPhone.phoneNumber]);

  const onSubmit = (data: FormCreateLocation) => {
    const inputDelivery = {
      input: {
        ...data,
        lat: position?.lat,
        lng: position?.lng,
        photos: photo ? [photo] : null,
        label: addressLabel,
      },
    };
    storeCreateAddress({ variables: inputDelivery })
      .then(() => {
        toast.success("New location has been created!");
        // router.back();
        router.push(`/cart?steps=shipping`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleNewPhoneChange(e: any) {
    const { name, value } = e.target;
    const object = {
      ...newPhone,
      [name]: value,
    };
    setNewPhone(() => object);
  }

  //  function to upload img
  async function handleChange(e: any) {
    e.preventDefault();

    const body = {
      upload: e.target?.files[0],
    };

    axios
      .post(
        `https://backend.riverbase.org/api/upload/image/${user?.id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res: AxiosResponse<any, any>) => {
        setPhoto(res.data.path);
        toast.success("File has been added");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // email verify partern
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        size="full"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>Select your location</h1>
                <p className="text-sm font-light">
                  Drag the icon to change your location
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="min-h-[60dvh] sm:h-[60dvh] lg:min-h-[80dvh]">
                  <DynamicMap
                    zoom={13}
                    position={position}
                    setPosition={setPosition}
                    addressName={addressName}
                    setAddressName={setAddressName}
                  />
                </div>
                {addressName && <p>{addressName}</p>}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="text-background w-full"
                  size="lg"
                >
                  Deliver to this location
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="container max-w-4xl mx-auto px-6 w-full pt-9 pb-36">
        <div>
          <Button
            className="-ml-2 text-default-700"
            radius="full"
            variant="flat"
            onClick={() => router.back()}
          >
            <Icon icon="solar:arrow-left-outline" fontSize={20} />
            Go back
          </Button>
          <div className="my-3">
            <h1 className="text-xl font-medium">New Location</h1>
            <p className="text-sm font-light mt-2">
              Heads up! To ensure a smooth delivery, please double-check your
              shipping address. An accurate location helps us get your order to
              you faster!
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <RadioGroup
            aria-label="Color"
            label="Label"
            classNames={{
              base: "mt-2",
              wrapper: "gap-2",
            }}
            orientation="horizontal"
            {...register("label")}
            value={addressLabel}
            onValueChange={setAddressLabel}
          >
            <LocationLabel value="Home" />
            <LocationLabel value="School" />
            <LocationLabel value="Office" />
            <LocationLabel value="Other" />
          </RadioGroup>

          <div className="w-full sm:w-full lg:w-1/2">
            <label>Photo</label>
            {!photo ? (
              <div className="text-center mt-2 font-medium text-gray-900 w-full">
                <label className="relative cursor-pointer flex flex-col justify-center items-center border border-dashed rounded-xl h-72">
                  <Icon icon="solar:streets-map-point-broken" fontSize={70} />
                  <span>Location picture</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG up to 2MB
                  </p>
                </label>
              </div>
            ) : (
              <>
                <Image
                  className="relative mx-auto mt-2 w-full object-contain cursor-pointer"
                  src={photo}
                  alt=""
                />
                <Button
                  color="danger"
                  variant="flat"
                  className="z-40 w-full"
                  onPress={() => setPhoto("")}
                  startContent={
                    <Icon
                      icon="solar:trash-bin-minimalistic-2-bold"
                      fontSize={18}
                    />
                  }
                >
                  Clear
                </Button>
              </>
            )}
          </div>

          <div onClick={onOpen}>
            <Input
              variant="bordered"
              label="Delivery Address"
              labelPlacement="outside"
              size="lg"
              placeholder="Pease select a delivery address"
              {...register("addressName", {
                required: true,
              })}
              isRequired
              className="w-full"
              defaultValue={addressName}
              // value={addressName}
              key={addressName}
              type="text"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              variant="bordered"
              label="First Name"
              labelPlacement="outside"
              size="lg"
              placeholder="First name is required"
              {...register("firstName", { required: true })}
              isRequired
            />
            <Input
              variant="bordered"
              label="Last Name"
              labelPlacement="outside"
              size="lg"
              placeholder="Last name is required"
              {...register("lastName", { required: true })}
              isRequired
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              variant="bordered"
              label="Phone number"
              labelPlacement="outside"
              size="lg"
              placeholder="0xx xx xxx"
              {...register("phoneNumber", { required: true })}
              isRequired
              defaultValue={newPhone.phoneNumber}
              value={newPhone.phoneNumber}
              onChange={handleNewPhoneChange}
              // onBlur={() => setIsBlurred(!isBlurred)}
              type="number"
              endContent={
                operator !== "" && (
                  <Chip size="sm" color={color as any}>
                    {operator}
                  </Chip>
                )
              }
              isInvalid={!isValid}
              errorMessage={validationMessage}
            />
            <Input
              variant="bordered"
              label="Email"
              labelPlacement="outside"
              size="lg"
              placeholder="example@gmail.com ..."
              {...register("email", { required: true })}
              isRequired
              type="email"
              isInvalid={isInvalidEmail}
              errorMessage={isInvalidEmail && "Your email is invalid!"}
              onValueChange={setEmail}
            />
          </div>

          <Button
            fullWidth
            size="lg"
            variant="flat"
            className="bg-foreground text-background"
            type="submit"
          >
            Save Location
          </Button>
        </form>
      </div>
    </>
  );
}
