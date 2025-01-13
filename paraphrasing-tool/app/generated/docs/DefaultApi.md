# openapi_client.DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**generate_test_post**](DefaultApi.md#generate_test_post) | **POST** /generate_test | Generate test
[**paraphrase_post**](DefaultApi.md#paraphrase_post) | **POST** /paraphrase | Paraphrase text


# **generate_test_post**
> AssessmentTest generate_test_post(body)

Generate test

### Example


```python
import openapi_client
from openapi_client.models.assessment_test import AssessmentTest
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    body = 'body_example' # str | 

    try:
        # Generate test
        api_response = api_instance.generate_test_post(body)
        print("The response of DefaultApi->generate_test_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->generate_test_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **str**|  | 

### Return type

[**AssessmentTest**](AssessmentTest.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **paraphrase_post**
> str paraphrase_post(body)

Paraphrase text

### Example


```python
import openapi_client
from openapi_client.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to http://localhost
# See configuration.py for a list of all supported configuration parameters.
configuration = openapi_client.Configuration(
    host = "http://localhost"
)


# Enter a context with an instance of the API client
with openapi_client.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = openapi_client.DefaultApi(api_client)
    body = 'body_example' # str | 

    try:
        # Paraphrase text
        api_response = api_instance.paraphrase_post(body)
        print("The response of DefaultApi->paraphrase_post:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->paraphrase_post: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **str**|  | 

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: text/plain
 - **Accept**: text/plain

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

