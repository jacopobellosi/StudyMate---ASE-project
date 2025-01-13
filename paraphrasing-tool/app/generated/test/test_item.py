# coding: utf-8

"""
    Paraphrasing Tool API

    No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

    The version of the OpenAPI document: 1.0.0
    Generated by OpenAPI Generator (https://openapi-generator.tech)

    Do not edit the class manually.
"""  # noqa: E501


import unittest

from openapi_client.models.item import Item


class TestItem(unittest.TestCase):
    """Item unit test stubs"""

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def make_instance(self, include_optional) -> Item:
        """Test Item
        include_optional is a boolean, when False only required
        params are included, when True both required and
        optional params are included"""
        # uncomment below to create an instance of `Item`
        """
        model = Item()
        if include_optional:
            return Item(
                identifier = '',
                title = '',
                response_declaration = openapi_client.models.response_declaration.ResponseDeclaration(
                    identifier = '', 
                    cardinality = '', 
                    base_type = '', 
                    correct_response = [
                        ''
                        ], ),
                item_body = openapi_client.models.choice_interaction.ChoiceInteraction(
                    response_identifier = '', 
                    shuffle = True, 
                    max_choices = 56, 
                    prompt = '', 
                    choices = [
                        openapi_client.models.simple_choice.SimpleChoice(
                            identifier = '', 
                            text = '', )
                        ], )
            )
        else:
            return Item(
                identifier = '',
                title = '',
                response_declaration = openapi_client.models.response_declaration.ResponseDeclaration(
                    identifier = '', 
                    cardinality = '', 
                    base_type = '', 
                    correct_response = [
                        ''
                        ], ),
                item_body = openapi_client.models.choice_interaction.ChoiceInteraction(
                    response_identifier = '', 
                    shuffle = True, 
                    max_choices = 56, 
                    prompt = '', 
                    choices = [
                        openapi_client.models.simple_choice.SimpleChoice(
                            identifier = '', 
                            text = '', )
                        ], ),
        )
        """

    def testItem(self):
        """Test Item"""
        # inst_req_only = self.make_instance(include_optional=False)
        # inst_req_and_optional = self.make_instance(include_optional=True)


if __name__ == "__main__":
    unittest.main()
