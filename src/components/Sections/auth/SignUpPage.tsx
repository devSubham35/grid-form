import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignUpPayload } from '@/@types/user.type';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import ThemeToggler from "@/components/Theme/ThemeToggler"
import { userSignUp } from '@/api/functions/auth/userAuth.api';
import { SignUpValidationSchema } from '@/schema/auth/AuthSchema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const SignUpPage = () => {

  /// Signup mutate function
  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: userSignUp,
  })

  /// React hook form logic
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpPayload>({
    resolver: yupResolver(SignUpValidationSchema)
  });

  /// Form submission handler
  const onSubmit = (payload: SignUpPayload) => {
    signUpMutate(payload)
    console.log(payload, "++66")
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">

              {/* Name Input */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register('name')}
                  error={!!errors.name}
                  placeholder="Your name"
                  errorText={errors?.name?.message}
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register('email')}
                  error={!!errors.email}
                  placeholder="Your email"
                  errorText={errors?.email?.message}
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register('password')}
                  error={!!errors.password}
                  placeholder="Password"
                  errorText={errors?.password?.message}
                />
              </div>

              {/* Organization Input */}
              <div className="flex flex-col space-y-1.5">
                <Input
                  {...register('organization.name')}
                  placeholder="Organization's Name"
                  error={!!errors.organization?.name}
                  errorText={errors?.organization?.name?.message}
                />
              </div>
            </div>

            {/* Submit Button */}
            <CardFooter className="w-full flex justify-between mt-4 p-0">
              <Button
                type="submit"
                className="w-full"
                loading={isPending}
              >
                Signup
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <div className="absolute top-8 right-8">
        <ThemeToggler />
      </div>
    </div>
  )
}

export default SignUpPage