"use client";

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { ChangeEvent } from 'react';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = () => {

    const form = useForm({
        resolver: zodResolver(UserValidation) ,
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: ''
        }
    })

    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
        e.preventDefault();
    }
    
    function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    
    return (
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                    {field.value ? (
                        <Image
                            src={field.value}
                            alt="profile photo"
                            width={96}
                            height={96}
                            priority
                            className="rounded-full object-contain"
                        />
                    ) : (
                        <Image
                        src="/assets/profile.svg"
                        alt="profile photo"
                        width={25}
                        height={25}
                        className="object-contain"
                    />
                    )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload a photo"
                    className="account-form_image-input"
                    onChange={(e) => handleImage(e, field.onChange)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                   Name
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Username"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                   UserName
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Bio"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 w-full">
                <FormLabel className="text-base-semibold text-light-2">
                   Bio
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <textarea
                    rows={10}
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}

export default AccountProfile;