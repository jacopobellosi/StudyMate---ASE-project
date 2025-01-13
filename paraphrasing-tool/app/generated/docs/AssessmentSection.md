# AssessmentSection


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**identifier** | **str** |  | 
**title** | **str** |  | 
**items** | [**List[Item]**](Item.md) |  | 

## Example

```python
from openapi_client.models.assessment_section import AssessmentSection

# TODO update the JSON string below
json = "{}"
# create an instance of AssessmentSection from a JSON string
assessment_section_instance = AssessmentSection.from_json(json)
# print the JSON string representation of the object
print(AssessmentSection.to_json())

# convert the object into a dict
assessment_section_dict = assessment_section_instance.to_dict()
# create an instance of AssessmentSection from a dict
assessment_section_from_dict = AssessmentSection.from_dict(assessment_section_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


