# AssessmentTest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**identifier** | **str** |  | 
**title** | **str** |  | 
**tool_name** | **str** |  | 
**tool_version** | **str** |  | 
**sections** | [**List[AssessmentSection]**](AssessmentSection.md) |  | 

## Example

```python
from openapi_client.models.assessment_test import AssessmentTest

# TODO update the JSON string below
json = "{}"
# create an instance of AssessmentTest from a JSON string
assessment_test_instance = AssessmentTest.from_json(json)
# print the JSON string representation of the object
print(AssessmentTest.to_json())

# convert the object into a dict
assessment_test_dict = assessment_test_instance.to_dict()
# create an instance of AssessmentTest from a dict
assessment_test_from_dict = AssessmentTest.from_dict(assessment_test_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


