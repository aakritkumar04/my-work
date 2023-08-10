from __future__ import absolute_import , division , print_function , unicode_literals
!pip install -q sklearn

%tensorflow_version 2.x
from google.colab import drive

drive.mount('/content/drive',force_remount = True)
import os
import sys
import sklearn as sk
import  pandas as pd
import matplotlib.pyplot as plot
import tensorflow.compat.v2.feature_column as fc
import tensorflow as tf
from IPython.display import clear_output
from six.moves import urllib
from sklearn.metrics import mean_squared_error

dftrain = pd.read_csv('/content/1.csv')
dfeval = pd.read_csv('/content/values.csv')
y_train = dftrain.pop('Frequency')
y_eval = dfeval.pop('Frequency')
# print(y_eval)
# print(dftrain)
# print(y_train)
CATEGORICAL_COLUMNS = ['Serial']
NUMERICAL_COLUMNS = ['Voltage']

feature_columns = []

for feature_name in CATEGORICAL_COLUMNS:
    vocabulary = dftrain[feature_name].unique()
    feature_columns.append(tf.feature_column.categorical_column_with_vocabulary_list(feature_name , vocabulary))

print(feature_columns)

for feature_name in NUMERICAL_COLUMNS:
    feature_columns.append(tf.feature_column.numeric_column(feature_name , dtype=tf.float32))

def make_input_function(data_df , label_df , num_epachs=1000, shuffle=True , batch_size=25):
    def input_function():
        ds = tf.data.Dataset.from_tensor_slices((dict(data_df) , label_df))
        if shuffle:
            ds = ds.shuffle(1000)
        ds = ds.batch(batch_size).repeat(num_epachs)
        return ds
    return input_function

train_input_fn = make_input_function(dftrain,y_train)
eval_input_fn = make_input_function(dfeval , y_eval , num_epachs=1 , shuffle=False)

linear_est = tf.estimator.LinearRegressor(feature_columns=feature_columns)
linear_est.train(train_input_fn)
result = linear_est.evaluate(eval_input_fn)

clear_output()

# print(result['accuracy'])

# print(result)
result = list(linear_est.predict(eval_input_fn))
print(result)
# result = tuple(result)
p = []

# for i in range(len(result)) :
#   array = result[i]['predictions']
#   p.append(array[0])
# # print(mean_squared_error(y_eval.values, result.values))
# ### Mean square error
# mean_squared_error(y_eval,p)

# print(dfeval.loc[2])
# print(y_eval.loc[2])
# print(result[0]['predictions'][0])
