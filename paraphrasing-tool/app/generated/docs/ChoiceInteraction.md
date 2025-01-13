# ChoiceInteraction


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**response_identifier** | **str** |  | 
**shuffle** | **bool** |  | 
**max_choices** | **int** |  | 
**prompt** | **str** |  | 
**choices** | [**List[SimpleChoice]**](SimpleChoice.md) |  | 

## Example

```python
from openapi_client.models.choice_interaction import ChoiceInteraction

# TODO update the JSON string below
json = "{}"
# create an instance of ChoiceInteraction from a JSON string
choice_interaction_instance = ChoiceInteraction.from_json(json)
# print the JSON string representation of the object
print(ChoiceInteraction.to_json())

# convert the object into a dict
choice_interaction_dict = choice_interaction_instance.to_dict()
# create an instance of ChoiceInteraction from a dict
choice_interaction_from_dict = ChoiceInteraction.from_dict(choice_interaction_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


