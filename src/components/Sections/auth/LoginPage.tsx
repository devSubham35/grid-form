import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoginPayload } from '@/@types/user.type';
import { yupResolver } from '@hookform/resolvers/yup';
import ThemeToggler from "@/components/Theme/ThemeToggler"
import { LoginValidationSchema } from '@/schema/auth/AuthSchema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const LoginPage = () => {

  /// Login mutate function
  // const { mutate: loginMutate, isPending } = useMutation({
  //   mutationFn: userLogin,
  // })

  /// React hook form logic
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>({
    resolver: yupResolver(LoginValidationSchema)
  });

  /// Form submission handler
  const onSubmit = (payload: LoginPayload) => {
    // loginMutate(payload)
    console.log(payload, "++66")
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[400px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">


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
            </div>

            {/* Submit Button */}
            <CardFooter className="w-full flex justify-between mt-4 p-0">
              <Button
                type="submit"
                className="w-full"
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

export default LoginPage