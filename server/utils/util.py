from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    get_csrf_token,
)
import json
from datetime import datetime


def row_to_dict(row, hidden_columns=[]) -> dict:
    """
    Turn database row into dict, without hidden colums

    :param row: object to turn into dict

    :param hidden_columns: list of hidden columns

    :return: dict
    """
    d = {}
    for column in row.__table__.columns:
        if column.name not in hidden_columns:
            attr = getattr(row, column.name)
            d[column.name] = attr
    return d


def set_access_and_refresh_token_cookies(response, user) -> None:
    """
    Set cookies to flask response object from spesified user identity
    """
    data = response.get_json()
    access_token = create_access_token(user)
    refresh_token = create_refresh_token(user)
    data["csrf_access_token"] = get_csrf_token(access_token)
    data["csrf_refresh_token"] = get_csrf_token(refresh_token)
    response.data = json.dumps(data)
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
