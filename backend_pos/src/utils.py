import uuid
from datetime import datetime
import pytz


class Utils(object):
    def generate_id(self):
        result = str(uuid.uuid4().fields[-1])[:5]
        print('gerando id...')
        return result

    def get_date(self):
        datetime_sp = datetime.now(pytz.timezone('America/Sao_Paulo'))
        iso_date = datetime_sp.isoformat().split('.')[0]
        return iso_date
