# ResponseDeclaration


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**identifier** | **str** |  | 
**cardinality** | **str** |  | 
**base_type** | **str** |  | 
**correct_response** | **List[str]** |  | 

## Example

```python
from openapi_client.models.response_declaration import ResponseDeclaration

# TODO update the JSON string below
json = "{}"
# create an instance of ResponseDeclaration from a JSON string
response_declaration_instance = ResponseDeclaration.from_json(json)
# print the JSON string representation of the object
print(ResponseDeclaration.to_json())

# convert the object into a dict
response_declaration_dict = response_declaration_instance.to_dict()
# create an instance of ResponseDeclaration from a dict
response_declaration_from_dict = ResponseDeclaration.from_dict(response_declaration_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


