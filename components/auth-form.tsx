'use client';

import { useFormStatus, useFormState } from 'react-dom';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

// 提交按钮组件
function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? '处理中...' : children}
    </Button>
  );
}

type FormState = {
  error?: string;
  success?: boolean;
  message?: string;
} | null;

type AuthFormProps = {
  action: (formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  defaultEmail?: string;
};

export function AuthForm({
  action,
  children,
  defaultEmail = "",
}: AuthFormProps) {
  // 使用 useFormState 处理表单状态
  const [state, formAction] = useFormState<FormState, FormData>(action, null);
  
  return (
    <form action={formAction} className="flex flex-col gap-4 px-4 sm:px-16">
      <div className="flex flex-col gap-2">
        <Label
          className="font-normal text-zinc-600 dark:text-zinc-400"
          htmlFor="email"
        >
          电子邮箱
        </Label>

        <Input
          autoComplete="email"
          autoFocus
          className="bg-muted text-md md:text-sm"
          defaultValue={defaultEmail}
          id="email"
          name="email"
          placeholder="user@example.com"
          required
          type="email"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          className="font-normal text-zinc-600 dark:text-zinc-400"
          htmlFor="password"
        >
          密码
        </Label>

        <Input
          className="bg-muted text-md md:text-sm"
          id="password"
          name="password"
          required
          type="password"
          minLength={6}
        />
      </div>

      {state?.error && (
        <p className="p-2 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded">
          {state.error}
        </p>
      )}

      {state?.message && !state?.error && (
        <p className="p-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded">
          {state.message}
        </p>
      )}

      <SubmitButton>继续</SubmitButton>
      {children}
    </form>
  );
}
