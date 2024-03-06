"use client"

import { Form, FormField, FormItem, FormMessage, useZodForm } from '@/components/ui/form';
import { ContentTextArea } from '@/src/theme/features/post/ContentTextArea';
import { PostLayout } from '@/src/theme/features/post/PostLayout';
import { User } from 'next-auth';
import { useRouter } from 'next/router';
import React from 'react'
import {z} from 'zod'; 
import { Button } from '@/components/ui/button';

const Schema = z.object({
  content: z.string().min(1).max(500),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User ;
  onSubmit: (values: WritePostFormValues) => Promise<string>;
};

export const WritePostForm = ({user, onSubmit}:WritePostFormProps) => {
  const form = useZodForm({
    schema: Schema,
  });
  const router = useRouter();


  return (
    <PostLayout user={user}>
      <Form
      form={form}
      onSubmit={async (values) => {
        const result = await onSubmit(values);
        router.push('/');
      }}
      >
        <FormField 
        control={form.control}
        name="content"
        render={({field}) => (
          <FormItem>
            <ContentTextArea {...field} />
            <FormMessage />
          </FormItem>
        )}
        />
        <div className='flex w-full justify-end'>
          <Button size="sm">Post</Button>
        </div>
      </Form>
    </PostLayout>
  )
}
