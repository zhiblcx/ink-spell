import { httpRequest } from "@/shared/API";
import { useMutation } from "@tanstack/vue-query";
import { LoginDto } from "./dto/login.dto";

export const loginMutation = () => useMutation({
  mutationFn: (loginDto: LoginDto) => httpRequest.post("/auth/login", loginDto)
})
