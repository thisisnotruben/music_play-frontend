# AccountControllerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createAccount**](AccountControllerApi.md#createaccount) | **POST** /api/v1/account/create | Create an account |
| [**editEmail**](AccountControllerApi.md#editemail) | **PATCH** /api/v1/account/edit/email | Edit e-mail |
| [**editFirstName**](AccountControllerApi.md#editfirstname) | **PATCH** /api/v1/account/edit/firstName | Edit first name |
| [**editLastName**](AccountControllerApi.md#editlastname) | **PATCH** /api/v1/account/edit/lastName | Edit last name |
| [**editPassword**](AccountControllerApi.md#editpassword) | **PATCH** /api/v1/account/edit/password | Edit password |
| [**editUsername**](AccountControllerApi.md#editusername) | **PATCH** /api/v1/account/edit/username | Edit username |
| [**getAccountInfo**](AccountControllerApi.md#getaccountinfo) | **GET** /api/v1/account/getAccountInfo | Get account info |
| [**login**](AccountControllerApi.md#login) | **POST** /api/v1/account/login | Login to an account |



## createAccount

> createAccount(accountCreateDto)

Create an account

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { CreateAccountRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // AccountCreateDto
    accountCreateDto: ...,
  } satisfies CreateAccountRequest;

  try {
    const data = await api.createAccount(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **accountCreateDto** | [AccountCreateDto](AccountCreateDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `*/*`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **400** | Account already exists or bad request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editEmail

> editEmail(email)

Edit e-mail

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { EditEmailRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    email: email_example,
  } satisfies EditEmailRequest;

  try {
    const data = await api.editEmail(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **email** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editFirstName

> editFirstName(firstName)

Edit first name

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { EditFirstNameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    firstName: firstName_example,
  } satisfies EditFirstNameRequest;

  try {
    const data = await api.editFirstName(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **firstName** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editLastName

> editLastName(lastName)

Edit last name

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { EditLastNameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    lastName: lastName_example,
  } satisfies EditLastNameRequest;

  try {
    const data = await api.editLastName(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **lastName** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editPassword

> editPassword(password)

Edit password

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { EditPasswordRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    password: password_example,
  } satisfies EditPasswordRequest;

  try {
    const data = await api.editPassword(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **password** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editUsername

> editUsername(username)

Edit username

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { EditUsernameRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    username: username_example,
  } satisfies EditUsernameRequest;

  try {
    const data = await api.editUsername(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | User not found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAccountInfo

> AppUserDto getAccountInfo()

Get account info

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { GetAccountInfoRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  try {
    const data = await api.getAccountInfo();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AppUserDto**](AppUserDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **400** | Bad Request |  -  |
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## login

> LoginResponseDto login(username, password)

Login to an account

### Example

```ts
import {
  Configuration,
  AccountControllerApi,
} from '';
import type { LoginRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AccountControllerApi();

  const body = {
    // string
    username: username_example,
    // string
    password: password_example,
  } satisfies LoginRequest;

  try {
    const data = await api.login(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **username** | `string` |  | [Defaults to `undefined`] |
| **password** | `string` |  | [Defaults to `undefined`] |

### Return type

[**LoginResponseDto**](LoginResponseDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `*/*`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **404** | Not Found |  -  |
| **400** | Bad Request |  -  |
| **200** | Ok |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

