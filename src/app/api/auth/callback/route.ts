import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')
  console.log(code)
  console.log(JSON.stringify(request))
  const redirectTo = request.cookies.get('redirectTo')?.value
  try {
    const registerResponse = await api.post('/register', {
      code,
    })

    const { token } = registerResponse.data

    const redirectURL = redirectTo ?? new URL('/', request.url)

    const cookieExpiresInSeconds = 60 * 60 * 24 * 30
    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
      },
    })
  } catch (error: any) {
    console.log('erro aqui', error)
    throw new Error(error)
  }
}
