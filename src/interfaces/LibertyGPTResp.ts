export interface LibertyGPTResp {
  id: string
  object: string
  created: number
  model: string;
  usage: Usage
  choices: Choice[]
}

export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface Choice {
  index: number
  logprobs: number
  message: Message
  finish_reason: string
}

export interface Message {
  content: string
  role: string
}