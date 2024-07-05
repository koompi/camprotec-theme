"use client";
import React, { FC } from "react";
import {
  Button,
  Input,
  RadioGroup,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react";
import LocationLabel from "../../components/LocationLabel";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/useAuth";

type LocationForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  salutation: string;
  countryId: string;
  communeId: string;
  districtId: string;
  provinceId: string;
};

export const LocationForm: FC<{
  register: any;
  photo: string;
  setPhoto: Function;
}> = ({ register, photo, setPhoto }) => {
  const { user } = useAuth();
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
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-6 pb-2">
          <RadioGroup
            aria-label="Color"
            label="Label"
            classNames={{
              base: "mt-2",
              wrapper: "gap-2",
            }}
            orientation="horizontal"
            {...register("label")}
          >
            <LocationLabel value="Home" />
            <LocationLabel value="School" />
            <LocationLabel value="Office" />
            <LocationLabel value="Other" />
          </RadioGroup>
        </div>
        <div className="col-span-6">
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
                <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 2MB</p>
              </label>
            </div>
          ) : (
            <div className="relative">
              <div className="flex justify-center text-center">
                <Image
                  className="relative mx-auto h-72 mt-2 w-full object-contain cursor-pointer"
                  src={photo}
                  alt=""
                />
              </div>
              <div className="absolute top-0 right-0">
                <Button
                  color="danger"
                  variant="flat"
                  className="z-40 top-0"
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
              </div>
            </div>
          )}
        </div>
        <div className="col-span-2">
          <Select
            {...register("salutation", {
              required: "Salutation is required",
            })}
            variant="flat"
            label="Salutation"
            placeholder="Salutation"
            labelPlacement="outside"
            size="lg"
            // defaultSelectedKeys={[store?.location?.salutation]}
          >
            <SelectItem key="MR">MR</SelectItem>
            <SelectItem key="MS">MS</SelectItem>
            <SelectItem key="OTHER">OTHER</SelectItem>
          </Select>
        </div>
        <div className="col-span-2">
          <Input
            variant="flat"
            label="First Name"
            labelPlacement="outside"
            {...register("firstName", {
              required: "First name is required",
            })}
            // defaultValue={store?.location?.firstName}
            size="lg"
            isRequired
            placeholder="Eg: A1"
          />
        </div>
        <div className="col-span-2">
          <Input
            variant="flat"
            label="Last Name"
            labelPlacement="outside"
            {...register("lastName", {
              required: "Last name is required",
            })}
            // defaultValue={store?.location?.lastName}
            size="lg"
            isRequired
            placeholder="Eg: A2"
          />
        </div>
        <div className="col-span-6">
          <Input
            variant="flat"
            label="Email"
            labelPlacement="outside"
            {...register("email", {
              required: "Email is required",
            })}
            // defaultValue={store?.location?.email}
            size="lg"
            isRequired
            placeholder="Eg: email@example.com"
          />
        </div>
        <div className="col-span-6">
          <Input
            variant="flat"
            label="Phone Number"
            labelPlacement="outside"
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            // defaultValue={store?.location?.phoneNumber}
            size="lg"
            isRequired
            placeholder="Eg: 010959402"
          />
        </div>
        <div className="col-span-3">
          <Select
            {...register("countryId", {
              required: "Country is required",
            })}
            variant="flat"
            label="Country"
            labelPlacement="outside"
            size="lg"
            // defaultSelectedKeys={[parseInt(store?.location?.countryId)]}
          >
            <SelectItem key="1">Cambodia</SelectItem>
          </Select>
        </div>
        <div className="col-span-3">
          <Select
            {...register("provinceId", {
              required: "Salutation is required",
            })}
            variant="flat"
            label="Province"
            labelPlacement="outside"
            size="lg"
            // defaultSelectedKeys={[parseInt(store?.location?.provinceId)]}
          >
            {[
              {
                id: 2,
                name_kh: "បន្ទាយមានជ័យ",
                name_en: "BANTEAY MEANCHEY",
                text: "បន្ទាយមានជ័យ",
              },
              {
                id: 3,
                name_kh: "បាត់ដំបង",
                name_en: "BATTAMBANG",
                text: "បាត់ដំបង",
              },
              {
                id: 13,
                name_kh: "ភ្នំពេញ",
                name_en: "PHNOM PENH",
                text: "ភ្នំពេញ",
              },
            ].map((item) => (
              <SelectItem key={item.id}>{item.name_en}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="col-span-3">
          <Select
            {...register("districtId", {
              required: "District is required",
            })}
            variant="flat"
            label="District"
            labelPlacement="outside"
            size="lg"
            // defaultSelectedKeys={[parseInt(store?.location?.districtId)]}
          >
            {[
              {
                id: 95,
                name_kh: "ចំការមន",
                name_en: "CHAMKAR MON",
                text: "ចំការមន",
                display: "ខណ្ឌ ចំការមន",
              },
              {
                id: 96,
                name_kh: "ដូនពេញ",
                name_en: "DAUN PENH",
                text: "ដូនពេញ",
                display: "ខណ្ឌ ដូនពេញ",
              },
              {
                id: 97,
                name_kh: "៧មករា",
                name_en: "PRAMPIR MAKARA",
                text: "៧មករា",
                display: "ខណ្ឌ ៧មករា",
              },
            ].map((item) => (
              <SelectItem key={item.id}>{item.name_en}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="col-span-3">
          <Select
            {...register("communeId", {
              required: "Commune is required",
            })}
            variant="flat"
            label="Commune"
            labelPlacement="outside"
            size="lg"
            // defaultSelectedKeys={[store?.location?.communeId]}
          >
            {[
              {
                id: "7169",
                name_kh: "ទន្លេបាសាក់",
                name_en: "TONLE BASAK",
                text: "ទន្លេបាសាក់",
                display: "សង្កាត់ ទន្លេបាសាក់",
              },
              {
                id: 7170,
                name_kh: "បឹងកេងកងទី ១",
                name_en: "BOENG KENG KANG I",
                text: "បឹងកេងកងទី ១",
                display: "សង្កាត់ បឹងកេងកងទី ១",
              },
            ].map((item) => (
              <SelectItem key={item.id}>{item.name_en}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};
